resource "digitalocean_droplet" "experience" {
  image  = var.IMAGE
  name   = var.NAME
  region = var.REGION
  size   = var.SIZE
  ssh_keys =[var.FINGERPRINT]

  connection {
        host = self.ipv4_address
        user = "root"
        type = "ssh"
        private_key = file(var.PATH_TO_PRIVATE_KEY)
        timeout = "2m"
  }

  provisioner "file" {
    source      = "script.sh"
    destination = "/tmp/script.sh"
  }

  provisioner "file" {
    source = "id_rsa"
    destination = "/tmp/id_rsa"
  }

  provisioner "file" {
    source = "id_rsa.pub"
    destination = "/tmp/id_rsa.pub"
  }

  provisioner "file" {
    source = "config"
    destination = "/tmp/config"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/script.sh",
      "bash /tmp/script.sh",
    ]
  }

  provisioner "local-exec" {
    command = "echo ${digitalocean_droplet.experience.ipv4_address} >> public_ips.txt"
  }
}
