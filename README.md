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
# setup EC2 to run app
```
#!/bin/bash
sudo yum install docker -y
sudo systemctl enable docker.service
sudo systemctl start docker.service

cat << EOF > start-globomantics
$(aws ecr get-login --no-include-email --region ap-southeast-1)
sudo docker run -p 3000:3000 012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:latest
EOF

sudo mv start-globomantics /var/lib/cloud/scripts/per-boot/start-globomantics
sudo chmod +x /var/lib/cloud/scripts/per-boot/start-globomantics
/var/lib/cloud/scripts/per-boot/start-globomantics
```

# set jenkins deployment
```
$(aws ecr get-login --no-include-email --region ap-southeast-1)
docker pull 012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:$TAG_TO_DEPLOY
docker tag 012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:$TAG_TO_DEPLOY \
           012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:release
docker push 012862735759.dkr.ecr.ap-southeast-1.amazonaws.com/globomantics:release
aws ec2 reboot-instances --region ap-southeast-1 --instance-ids $EC2_INSTANCE
```
