# 4-EmployeeBadge

This Viva Connection app shows an employee badge for the current user.  
The user profile picture is loaded from SharePoint, while the user data is queried from the Microsoft Graph. The barcode (currently) is hardcoded, just to show the idea. More description will be added soon.  

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Run it

To run (and to deploy) apps, run these commands:

```powershell
npm install

gulp serve 

gulp bundle --ship

gulp package-solution --ship
```

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
