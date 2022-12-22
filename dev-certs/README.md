# How create a self-signed certificate
A self-signed certificate is an SSL/TSL certificate not signed by a public or private certificate authority. Instead,
it is signed by the creator’s own personal or root CA certificate.

These steps allow developers to create its own self-service certiciate for webpack-dev-server (local env). Once
the different files are generated, we need to update the `webpack.dev.js` config file.

## Creating a private key
A private key helps to enable encryption, and it's the most important component of our certificate. For
creating a password-protected, 2048-bit RSA private key for `domain.key`:

```
openssl genrsa -out domain.key 2048 -des3
```

## Creating a Certificate Signing Request
Let's create a CSR (domain.csr) from our existing private key in case we want our certificate signed:

```
openssl req -new -key domain.key -out domain.csr
```

Notes:
- *An important field is “Common Name,” which should be the exact Fully Qualified Domain Name (FQDN) of our domain.*
- *"A challenge password" and "An optional company name" can be left empty.

We can also create both the private key and CSR with a single command:
```
openssl req -newkey rsa:2048 -keyout domain.key -out domain.csr
```

If we want our private key unencrypted, we can add the -nodes option:

```
openssl req -newkey rsa:2048 -nodes -keyout domain.key -out domain.csr
```
Note: *-nodes stands for no DES*

## Creating a Self-Signed Certificate
Let's create a self-signed certificate (domain.crt) with our existing private key and CSR:

```
openssl x509 -signkey domain.key -in domain.csr -req -days 365 -out domain.crt
```

We can create a self-signed certificate with just a private key:
```
openssl req -key domain.key -new -x509 -days 365 -out domain.crt
```

We can even create a private key and a self-signed certificate with just a single command:

```
openssl req -newkey rsa:2048 -keyout domain.key -x509 -days 365 -out domain.crt
```

## Converting PEM to PKCS12 file (PFX)
These files are usually used for importing and exporting certificate chains in Microsoft IIS; in case it would be
needed, you can convert with the following command:

```
openssl pkcs12 -inkey domain.key -in domain.crt -export -out domain.pfx
```
