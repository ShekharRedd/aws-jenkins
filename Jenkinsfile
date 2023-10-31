pipeline{
    agent any
    stages{
        stage("Build react image"){
            steps{

                echo "========executing Build python Images========"
                sh 'cd react | ls -l'
                // withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            
                // sh "docker build -f ~/react/Dockerfile  -t my-react:1.0 react/."
                // sh "echo $PASS | docker login -u $USER --password-stdin"
                // sh "docker push $image"
                }
            }
            }
            stage("Build python image"){
            steps{
                echo "========executing Build python Images========"
                sh 'cd python | ls -l'
                // withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                // sh "docker build -t my-react:1.0 ."
                // sh 'echo $USER'
                // sh "echo $PASS | docker login -u $USER --password-stdin"
                // sh "docker push $image"
                }
            }
            }
    
    
