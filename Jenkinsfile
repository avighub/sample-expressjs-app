pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh pwd
                sh 'npm install'
            }
        }
        stage('Start App') {
            steps {
                sh 'node server.js'
            }
        }
        stage('Run Unit Tests') {
            steps {
                sh 'npx jest'
            }
        }
        stage('Run Web Tests') {
            steps {
                git 'https://github.com/jglick/simple-maven-project-with-tests.git'
                npm init playwright@latest
                npx playwright install
                npx playwright test
            }
        }
    }
}