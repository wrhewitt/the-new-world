resource "google_cloud_run_service" "default" {
  name     = "the-new-world"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "us.gcr.io/${var.project}/the-new-world/the-new-world"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}