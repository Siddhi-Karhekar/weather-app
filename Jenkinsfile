pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'weather-backend'
        FRONTEND_IMAGE = 'weather-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Pulling code from GitHub...'
                git branch: 'main', url: 'https://github.com/Siddhi-Karhekar/weather-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                echo '⚙️ Building backend Docker image...'
                dir('backend') {
                    sh 'docker build -t ${BACKEND_IMAGE} .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo '⚙️ Building frontend Docker image...'
                dir('frontend') {
                    sh 'docker build -t ${FRONTEND_IMAGE} .'
                }
            }
        }

        stage('Run Application Stack') {
            steps {
                echo '🚀 Deploying stack via docker-compose...'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Post-Deployment Check') {
            steps {
                echo '🧠 Verifying containers are running...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline executed successfully!'
        }
        failure {
            echo '❌ CI/CD Pipeline failed. Check logs for errors.'
        }
    }
}
