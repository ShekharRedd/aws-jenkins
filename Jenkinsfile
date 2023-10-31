pipeline{
    agent any
    environment {
        image = "my-rea"
        tag = "1.0"
    }
    stages{

        stage("check the code") {
            steps{
                script{
                    def imageExists = sh(script: "docker inspect ${image}:${tag}", returnStatus: true) == 0
                    if (imageExists) {
                        echo "Docker image ${image}:${tag} already exists. Skipping build and push."
                    } else {
                        echo "Docker image ${image}:${tag} does not exist. Proceeding with build."
                        }
                    }
            }
        }

        stage("Build react image"){
            steps{
                echo "========executing Build react Images========"
                // withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                // sh "cd react && docker build -t my-react:1.0 ."
                // sh 'echo $USER'
                // sh "echo $PASS | docker login -u $USER --password-stdin"
                // sh "docker tag my-react:1.0 $USER/my-react:1.0"
                // sh "docker push $USER/my-react:1.0"
                }

            }
        
            
            // stage("Build python image"){
            // steps{
                
            //     withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            //     sh "docker build -t my-python:1.0 ."
            //     sh 'echo $USER'
            //     sh "echo $PASS | docker login -u $USER --password-stdin"
            //     sh "docker push $USER/my-python:1.0"
        
            //     }
            // }
            
            // }

    }
}
