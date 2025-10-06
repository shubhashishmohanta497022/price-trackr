🚀 Deployment Guide: Price Trackr
This guide provides a complete walkthrough for deploying the Price Trackr application stack to a production environment on a Linux VPS using Docker Compose.

Prerequisites
Before you begin, ensure you have the following:

A Virtual Private Server (VPS): A fresh server running a modern Linux distribution (Ubuntu 22.04 LTS is recommended).

Minimum Specs: 2 vCPU, 4GB RAM, 50GB SSD.

A Domain Name: A registered domain name (e.g., yourdomain.com) with DNS records pointed to your VPS's IP address. You will need A records for yourdomain.com, api.yourdomain.com, and ws.yourdomain.com.

SSH Access: You must be able to connect to your VPS as a user with sudo privileges.

Step 1: Server Setup & Docker Installation
First, connect to your server and install Docker and Docker Compose, which are required to run the application.

Connect to your VPS via SSH:

ssh your_user@your_server_ip

Install Docker Engine and Docker Compose: The most reliable way to do this is using Docker's official convenience script.

# Download and run the Docker installation script
curl -fsSL [https://get.docker.com](https://get.docker.com) -o get-docker.sh
sudo sh get-docker.sh

# Add your user to the 'docker' group to run docker commands without 'sudo'
# You will need to log out and log back in for this to take effect.
sudo usermod -aG docker ${USER}

After running this, log out of SSH and log back in to apply the group changes.

Step 2: Get the Application Code
Clone the project repository from GitHub onto your server. The recommended location is /opt/price-trackr.

# Clone the repository into /opt/price-trackr
sudo git clone [https://github.com/your-username/price-trackr.git](https://github.com/your-username/price-trackr.git) /opt/price-trackr

# Navigate into the project directory
cd /opt/price-trackr

Step 3: Application Configuration
Configure the application using the .env file and update the Nginx configuration.

Create the .env file: Copy the example file to create your own configuration file.

cp .env.example .env

Edit the .env file: Open the file with a text editor (like nano or vim) and set your values.

nano .env

You must set the following variables. Use strong, unique passwords.

# .env
DOMAIN_NAME=yourdomain.com
POSTGRES_USER=tracker_user
POSTGRES_PASSWORD=a_very_strong_and_secret_password
REDIS_PASSWORD=another_strong_secret_password
SECRET_KEY=a_super_long_random_string_for_jwt_secrets

Configure Nginx: Replace the placeholder example.com in the Nginx config with your actual domain name.

# This command replaces all instances of the placeholder domains.
# Make sure to use your actual domain here.
sudo sed -i 's/[example.com/yourdomain.com/g](https://example.com/yourdomain.com/g)' infra/nginx/site.conf
sudo sed -i 's/[api.example.com/api.yourdomain.com/g](https://api.example.com/api.yourdomain.com/g)' infra/nginx/site.conf
sudo sed -i 's/[ws.example.com/ws.yourdomain.com/g](https://ws.example.com/ws.yourdomain.com/g)' infra/nginx/site.conf

Step 4: Obtain SSL Certificates (HTTPS)
We will use Certbot (via Docker) to get free SSL certificates from Let's Encrypt.

Start Nginx Temporarily: Start only the Nginx container to serve the validation files for Certbot.

docker compose up -d nginx

Run Certbot: Execute the Certbot command to obtain the certificates. Replace the email and domains with your own.

docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot \
  -d yourdomain.com \
  -d api.yourdomain.com \
  -d ws.yourdomain.com \
  --email your-email@example.com \
  --agree-tos --no-eff-email

Stop Nginx:

docker compose down

Enable SSL in Nginx: Now that you have the certificates, uncomment the SSL lines in your Nginx config.

# This command removes the '#' from the SSL-related lines.
sudo sed -i 's/# ssl_/ssl_/g' infra/nginx/site.conf

Step 5: Initialize the Database
Before the first full launch, you need to create the database tables using Alembic migrations.

Build the backend image:

docker compose build backend

Run the database migration:

docker compose run --rm backend alembic upgrade head

Step 6: Launch the Full Application
You are now ready to launch the entire stack.

docker compose up -d

Your Price Trackr application should now be live and accessible at https://yourdomain.com. It might take a minute for all containers to start up.

Step 7: (Optional) Install as a Systemd Service
To ensure the application automatically starts on server boot, install the provided systemd service.

Copy the service file:

sudo cp infra/systemd/price-trackr.service /etc/systemd/system/price-trackr.service

Reload the systemd daemon and enable the service:

sudo systemctl daemon-reload
sudo systemctl enable price-trackr.service
sudo systemctl start price-trackr.service

Check the status:

sudo systemctl status price-trackr.service
# To view live logs for all containers:
cd /opt/price-trackr && docker compose logs -f
