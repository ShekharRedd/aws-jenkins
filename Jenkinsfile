pipeline {
    agent any
    environment {
        image1 = "my-react"
        tag1 = "5.0"
        image2 ="my-python"
        tag2="5.0"
    }    
    stages {
        stage("check the react image") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    env.USER = USER                                    
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    }
                    try {
                        def imageExistsReact = sh(script: "docker inspect $USER/${image1}:${tag1}", returnStatus: true) == 0
                        // Image exists, set the environment variable to true
                        if (imageExistsReact) {
                            echo "Docker image ${image1}:${tag1} already exists my-react:1.0 . Skipping build and push."
                        // Set the variable in the shared scope
                            env.CURRENT1 = 'true'  // Use env.CURRENT to set environment variable for use in other stages
                        }
                        else {
                        echo "Docker image ${image}:${tag} does not exist my-react:1.0. Proceeding with build."
                        // Set the variable in the shared scope
                        env.CURRENT1 = 'false' // Use env.CURRENT to set environment variable for use in other stages
                        }
                    } catch (Exception e) {
                        // Image doesn't exist, set the environment variable to false
                        echo "Docker image ${image1}:${tag1} does not exist my-react:1.0. Proceeding with build."
                        env.CURRENT1 = 'false'
                    }
                    
                    try {
                        def imageExistsPython = sh(script: "docker inspect $USER/${image2}:${tag2}", returnStatus: true) == 0
                        if (imageExistsPython) {
                        echo "Docker image ${image2}:${tag2} already exists my-python:1.0 . Skipping build and push."
                        // current2 = true
                        // Set the variable in the shared scope
                        env.CURRENT2 = 'true'  // Use env.CURRENT to set environment variable for use in other stages
                    } else {
                        echo "Docker image ${image2}:${tag2} does not exist my-python:1.0. Proceeding with build."
                        // Set the variable in the shared scope
                        env.CURRENT2 = 'false' // Use env.CURRENT to set environment variable for use in other stages
                        }
                    } catch (Exception e) {
                        // Image doesn't exist, set the environment variable to false
                        echo "Docker image ${image2}:${tag2} does not exist my-react:1.0. Proceeding with build."
                        env.CURRENT2 = 'false'
                    }                    
                    
                }
            }
        }
        stage("Build react image") {
            when {
                expression { env.CURRENT1 != 'true' } // Use env.CURRENT to access the environment variable
            }
            steps {
                echo "========executing Build react Images========"
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                sh "cd react && docker build -t ${image1}:${tag1} ."
                sh "echo $PASS | docker login -u $USER --password-stdin"
                sh "docker tag my-react:1.0 $USER/${image1}:${tag1}"
                sh "docker push $USER/${image1}:${tag1}"
                }                
            }
        }
        stage("Build python image"){
            when{
                expression {env.CURRENT2 !='true'}
            }
            steps{
                echo "========executing Build python Images========"
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                sh "cd python && docker build -t ${image2}:${tag2} ."
                sh 'echo $USER'
                sh "echo $PASS | docker login -u $USER --password-stdin"
                sh "docker tag ${image2}:${tag2} $USER/${image2}:${tag2}"
                sh "docker push $USER/${image2}:${tag2}"
                }                
                
            }
        }
}
}