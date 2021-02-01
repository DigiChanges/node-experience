variable "do_token" {}

variable "FINGERPRINT" {}

variable "REGION" {
  default = "nyc1"
}
variable "SIZE" {
  default = "s-1vcpu-1gb"
}

variable "IMAGE" {
    default = "ubuntu-20-04-x64"
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "id_rsa"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "id_rsa.pub"
}
variable "INSTANCE_USERNAME" {
  default = "root"
}

variable "NAME" {
  default = "experience"
}