
terraform {
  backend "gcs" {
    bucket = "the-new-world-376918-tfstate"
    prefix = "env/prod"
  }
}
