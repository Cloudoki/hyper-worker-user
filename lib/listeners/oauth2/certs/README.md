# TODO
Generate new certificates:
```
openssl genrsa -aes256 -out private_key.pem 2048
openssl rsa -pubout -in private_key.pem -out certificate.pem
```
