#!/bin/bash

# Check if Docker is installed, if not install it
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker not found. Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  sudo usermod -aG docker $USER
  rm get-docker.sh
else
  echo "Docker is already installed"
fi

# Check if Docker Compose is installed, if not install it
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Docker Compose not found. Installing Docker Compose..."
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
else
  echo "Docker Compose is already installed"
fi
