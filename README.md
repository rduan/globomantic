```
 docker image build --tag globomantics .

docker container run --detach --publish 3000:3000 globomantics
```
```
$(aws ecr get-login --no-include-email --region ap-southeast-1)
docker build -t 012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:$(git rev-parse HEAD) .
docker push 012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:$(git rev-parse HEAD)
```

# jenkins
```
sudo -u jenkins ssh-keygen
sudo cat /var/lib/jenkins/.ssh/id_rsa.pub

```

## add ssh to github repository
## test ssh connection from EC2/jenkins
```
sudo -u jenkins ssh git@github.com
```
# need install git on EC2/jenkins to pull repository

```
sudo yum install -y git
```



