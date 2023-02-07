# VivaConnections samples

Microsoft Viva Connections is a desktop and mobile experience that brings together relevant news, conversations, and resources in one place for your organization. Find out more about Viva Connections at https://docs.microsoft.com/en-us/viva/connections/viva-connections-overview.

This repository is a joint project by [Martina Grom](https://github.com/martinagrom) and [Toni Pohl](https://github.com/tonipohl) and contains links and samples how to use and how to develop Viva Connections in your Microsoft 365 tenant. The *samples* directory contains some small projects from static Adaptive Cards to simple SPFx apps.

## Set up and launch Viva Connections

To configure your own M365 tenant for Viva Connections, follow the guide provided at https://docs.microsoft.com/en-us/viva/connections/guide-to-setting-up-viva-connections.

## Development requirements

Find the requirements to develop a SPFx app here:

- Set up your SharePoint Framework development environment: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- Install development tools for extending Viva Connections: https://docs.microsoft.com/en-us/learn/modules/viva-connections-extend-with-adaptive-card-extensions/2-exercise-install-development-tools-for-extending-viva-connections

## Design guidelines

Viva Connections apps are using Adaptive Card Extensions (ACE). These are are similar to "web parts" in SharePoint, but use Adaptive Cards to implement the UI. Adaptive Cards are JSON structures that can be rendered on desktop and mobile clients. ACEs can be exposed through the Viva Connections Desktop or Mobile experiences. They work through a special dashboard that users in your organization configure and they are the building blocks of pages that appear on a SharePoint site.

To see how a Viva Connections app should be designed, check out the following resources:

- Viva Connections Adaptive Card Extension design guidance: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/viva/design/design-intro
- https://docs.microsoft.com/en-us/sharepoint/dev/spfx/viva/overview-viva-connections 
- https://docs.microsoft.com/en-us/learn/modules/viva-connections-get-started/4-understand-viva-connections-extensibility-capabilities
- https://adaptivecards.io

## Create a new app

When all tools are installed, create a new SPFx app with YeoMan generator, and select ACE and one of the three available card types.

```powershell
yo @microsoft/sharepoint
```

Sample:
See https://aka.ms/spfx-yeoman-info for more information on how to use this generator.
Let's create a new SharePoint solution.
? What is your solution name? submit-form
? Which type of client-side component to create? Adaptive Card Extension
? Which template do you want to use? Primary Text Template
Add new Adaptive Card Extension to solution submit-form.
? What is your Adaptive Card Extension name? SubmitForm

## Run an app

Run npm install, and gulp serve --nobrowser to try it out.  
Open your localhost, or a SharePoint Online site to run in context, e.g.:  
https://<your-tenantname>.sharepoint.com/sites/Home/_layouts/15/workbench.aspx  

## Work with action handlers

- Action Handlers in Adaptive Card Extension with SPFx: https://nanddeepnachanblogs.com/posts/2021-10-06-action-handlers-in-ace-with-spfx/

## Consume APIs

Check out the good documentation here:

- Consume the Microsoft Graph in the SharePoint Framework: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial
- To quickly send data to an endpoint, you can use the built-in Fetch method in React as well: https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

## Learn

To develop your first Viva Connections app, see these resources:

- https://www.youtube.com/watch?v=SeOxo_YnkxA 
- https://docs.microsoft.com/en-us/learn/modules/viva-connections-extend-with-adaptive-card-extensions/ 

## Testing samples

You can find a bunch of cool samples here:

- Open-source designs for Adaptive Cards: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/viva/design/quick-view-samples
- GitHub PnP team samples: https://github.com/pnp/sp-dev-fx-aces/tree/main/samples
- PnP videos: https://aka.ms/M365PnP/videos 

To run (and to deploy) apps, run these commands:

```powershell
npm install

gulp serve 

gulp bundle --ship

gulp package-solution --ship
```

Note: If you have access to demos.microsoft.com, you can also deploy a M365 demo tenant containing Viva sample content.

Happy testing and developing!

