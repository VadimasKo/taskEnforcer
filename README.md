# Task Enforcer :ledger: :lock:

| Table Of Contents    su| link       |
| ---------------------| ---------- |
| About                | [here](#1) |
| Dev roadmap          | [here](#2) |
| Running and Debuging | [here](#3) |

## About 🔍 <a name='1'></a>
This extension notifies users to do a certain task and while this task is not completed users will have no access to social media and other websites.

Extension settings include:
 - Task name and completion time
 - Task periodicity
 - Scheduled time
 - List of blockable websites

## Development roadmap :golf: <a name='2'></a>

### Firefox 
 - [x] Implement website blocking / redirect
 - [ ] Block based on condition
 - [ ] Store config using Storage API
 - [ ] Create Settings page
 - [ ] Create redirect page
 - [ ] Create notifications
 - [ ] Complete Readme

### Chrome
- [ ] Copy firefox extension
- [ ] Translate manifest v2 -> v3

## Running and Debuging 🛠️ <a name="3"></a>

 ### <ins> To run and debug Firefox extension: </ins>
- install web-ext tool  `npm install --global web-ext`
- Move into firefox root directory `cd firefox`
- To test extension run `web-ext run`
