variable "domain_name" {
  default = "furd.dev"
  type    = string
}

variable "bucket_name" {
  default = "furd-dev"
  type    = string
}

variable "github_repo" {
  default = "zolrath/furd-dev"
  type    = string
}

variable "mx_verification" {
  default = "LDFPU2H4TO5HSOQHMUSCGDWXVF2AVXZIW4ASNBQQINDFDK24DWIQ.MX-VERIFICATION.GOOGLE.COM"
  type    = string
}

variable "bluesky_verification" {
  default = "did=did:plc:7lmglrt6jmevs7yz5oyghofh"
  type    = string
}
