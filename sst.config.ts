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

      const site = new NextjsSite(stack, 'site', { bind: [bucket] });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
