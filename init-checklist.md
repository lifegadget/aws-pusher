# INIT Pipeline Checklist

> Tasks that could/should be done within the INIT pipeline task

## IAM
- **User Exists**. Check that identified IAM user from config exists, create if doesn't
- **Security Policy Exists**. Ensure that security policy "[app-name]-publish-rights", create if doesn't
- **Group Exists**. Ensure that IAM group "[app-name]-publishers" exists, create if doesn't
- **Group has Policy**. Check that group is granted the security policy permission, grant if 
- **User in Group**. Check that user is in group, add if not.

## S3
### Primary Domain (aka, website.com)
- **Bucket Exists**. Check existance of "website.com" S3 bucket, create if doesn't exist. 
- **Static Hosting Config**. Ensure settings of "static site" are complete:
  - 'static hosting' turned on
  - policy file added

### Alias Domain (aka, www.website.com)

> note: config should allow for "www" to be either primary or alias/secondary; only one though should host content, the other should redirect.

- **Bucket Exists**
- **Static Redirect Config**. Ensure alias domain redirects to Route53 DNS name of primary domain:
  - step 1
  - step 2

### 2nd Level Domains
- fill
- this 
- in 

## CloudFront

- fill
- this 
- in

## Route53

- fill
- this 
- in
  
  
