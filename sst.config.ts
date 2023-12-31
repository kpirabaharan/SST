import { SSTConfig } from 'sst';
import { NextjsSite, Bucket, Cron } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'sst-tutorial',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Create a new S3 bucket
      const bucket = new Bucket(stack, 'public', {
        cors: [
          {
            maxAge: '60 second',
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
            allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          },
        ],
      });

      // Create new Cron job
      new Cron(stack, 'cron', {
        schedule: 'rate(1 day)',
        job: {
          function: {
            bind: [bucket],
            handler: 'src/functions/delete.handler',
          },
        },
      });

      const site = new NextjsSite(stack, 'site', { bind: [bucket] });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
