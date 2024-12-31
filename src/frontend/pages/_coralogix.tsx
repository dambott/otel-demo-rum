'use client';
import { useEffect } from 'react';

export default function CoralogixRumInit() {
  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement('script');
      script.src =
        'https://cdn.rum-ingress-coralogix.com/coralogix/browser/latest/coralogix-browser-sdk.js';
        script.addEventListener("DOMContentLoaded", function(event) {
          console.log("script loaded ");
        });
      script.onload = () => {
        console.log('Script loaded successfully!');

        (window as any)?.CoralogixRum.init({
            environment: "${CORALOGIX_RUM_ENV}",
            application: "${CORALOGIX_RUM_APP}",
            debug: true,
            version: "${CORALOGIX_RUM_VERSION}",
            public_key: "${CORALOGIX_RUM_KEY}",
            coralogixDomain: "${CORALOGIX_RUM_DOMAIN}",
            user_context: {
              user_email: 'testuser@coralogix.com',
              user_name: 'testuser',
              user_id: '123',
            },
            sessionConfig: {
              sessionSampleRate: 100,
              alwaysTrackSessionsWithErrors: true,
            },
            instrumentations: {
              errors: true,
              fetch: true,
              xhr: true,
              custom: true,
              long_tasks: true,
              resources: true,
              interactions: true,
              web_vitals: true,
            },
            sessionRecordingConfig: {
              enable: true,
              autoStartSessionRecording: true,
              maskInputOptions: { password: true },
              recordConsoleEvents: true,
              recordCanvas: true,
            },
            traceParentInHeader: {
              enabled: true,
              options: {
                propagateTraceHeaderCorsUrls: [new RegExp('http://*'), new RegExp('https://*')],
                propagateB3TraceHeader: {
                      singleHeader: true,
                      multiHeader: true,
                  },
                propagateAwsXrayTraceHeader: true,
              },
            },
            beforeSend: (event) => {
              if (event.event_context.type === 'error') {
                const id = (window as any)?.CoralogixRum.screenshot('creating a screenshot due to an error!');
                event.screenshotId = id;
              }

              return event
            },
            labels: {
              runningFrom: 'MacHost'
            }
        });
      };

      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  return null;
}

