
output "network" {
  value = "${module.vpc.network}"
}

output "subnet" {
  value = "${module.vpc.subnet}"
}

output "firewall_rule" {
  value = "${module.firewall.firewall_rule}"
}

output "service_url" {
  value       = "${module.google_cloud_run_service.main.status[0].url}"
  description = "The URL on which the deployed service is available"
}

output "verified_domain_name" {
  value       = values("${module.google_cloud_run_domain_mapping.domain_map}")[*].name
  description = "List of Custom Domain Name"
}
