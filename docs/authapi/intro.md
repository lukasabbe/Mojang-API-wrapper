# Mojang Authentication API

Before you begin using this part of Mojangs API you need setup a few things.

Make sure to read all the instructions bellow to use this part of the API

Also its good to have an basic knowledge of 2authO

## Setup instructions

1. You will need an Microsoft Entra Application, if you don't have one you need to create one
    - You will first need an [Azure](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount&WT.mc_id=A261C142F) account. You can create one for free.
    - After that head to https://entra.microsoft.com/
    - Under `Applications -> App registrations` on the left side
    - Click `New registration` and follow the instructions on the website
    - Under `Authentication` in your new application you can add an redirect link. I would use `localhost` for testing!
2. After you have gotten yourself an Entra Application you will need to be aproved by Mojang. 
You can send in a request here -> https://aka.ms/mce-reviewappid. This is a manual procces, so it can take around a week! (When i got accepted, i did not get an mail, so try this code after a week and check if it works)


After this you should have an everything you need! 

