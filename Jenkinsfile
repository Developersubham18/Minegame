pipeline {
    agent any

    stages {
        stage("Code") {
            steps {
                echo "Cloning the code"
                git url:"https://github.com/Developersubham18/Minegame.git/", branch: "master"
            }
        }

        stage("Build") {
            steps {
                echo "Building the image"
                sh "docker build -t mine_img ."
            }
        }

        stage("Push to DockerHub") {
            steps {
                echo "Pushing to DockerHub"
                withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"P" ,usernameVariable:"U")]){
                sh "docker tag mine_img ${env.U}/mine_img:latest"
                sh "docker login -u ${env.U} -p ${env.P}"
                sh "docker push ${env.U}/mine_img:latest"  
                }
                
            }
        }

        stage("Deploy") {
            steps {
                echo "Deploying the container"
                sh "docker-compose down && docker-compose up -d"
            }
        }
    }
}
