
resource "digitalocean_firewall" "experience" {
  name = "only-22-80-and-443"

  droplet_ids = [digitalocean_droplet.experience.id]

  inbound_rule {
    protocol = "tcp"
    port_range = "22"
    source_addresses = ["0.0.0.0/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "8089"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "9002"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "8027"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "udp"
    port_range = "53"
    destination_addresses  = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "tcp"
    port_range = "80"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol = "tcp"
    port_range = "443"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}