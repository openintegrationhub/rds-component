# rds-component

## Description
This component allows to save the payload of a message into the `raw data storage (rds)`. 

For this purpose, a unique id is generated, which is appended as an additional `metadata` property of the forwarded message.

### Usage

> Make sure that `rds service` is running in your environment. See https://github.com/openintegrationhub/openintegrationhub/tree/master/services/rds

Follow these steps to use rds-component in your setup:

- You basically proceed as you would with any other component and build a `Docker image`. 
- To do this, run 
```zsh
VERSION=latest DOCKER_DOMAIN=your-domain npm run docker:build
```

After all the necessary steps are done, create a new component that might look like the following.

```JavaScript
  {
    distribution: {
      type: 'docker',
      image: 'your-domain/rds-component:latest',
    },
    isGlobal: true,
    access: 'public',
    name: 'rds-component',
    description:
      "This component allows to save the payload of a message into rds.",
    descriptor: {
      replicas: 1
    },
    resources: {
      requests: {
        memory: '64Mi',
        cpu: '125m',
      },
      limits: {
        memory: '128Mi',
        cpu: '250m',
      },
    },
    owners: [
      {
        id: 'your-user-id',
        type: 'user',
      },
    ],
  },
```


- then extend the `nodes` list of the desired flow graph with your new rds-component
- after this, add a new edge in `edges`, so that everything is connected properly and you get a flow definition looking like this

```JavaScript
{
    name: 'raw-data-example',
    graph: {
      nodes: [
        {
          id: 'step_1',
          componentId: 'other-component1',
          function: 'trigger'
        },
        {
          id: 'step_2',
          componentId: 'other-component2',
          function: 'action1'
        },
        // //
        // rds entry will be created here
        {
          id: 'step_3',
          componentId: 'rds-component',
          function: 'storeRawData'
        },
        // //
        {
          id: 'step_4',
          componentId: 'other-component3',
          function: 'action2'
        },
      ],
      edges: [
        {
          source: 'step_1',
          target: 'step_2',
        },
        {
          // //
          // create a valid connection between your nodes
          source: 'step_2',
          target: 'step_3',
          // //
        },
                {
          source: 'step_3',
          target: 'step_4',
        }
      ],
    },
  },
```
Once this flow is now executed, our neat `rds component` creates a new raw data entry for each incoming `msg.data` and appends the created `rawRecordId` as a `msg.metadata` to the outgoing message.



 
