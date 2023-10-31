pipeline{
    agent any
    stages{
        stage("Build react image"){
            steps{
                // script{
                //     dir('react'){
                //         withCredewithCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                // sh "docker build -t my-react:1.0 ."
                // sh 'echo $USER'
                // sh "echo $PASS | docker login -u $USER --password-stdin"
                // sh "docker push $USER/my-react:1.0"
                // }
                //     }
                // }
                script{
                    dir("react"){
                        sh 'ls -l'
                    }
                }

            }
        }
            
            // stage("Build python image"){
            // steps{
            //     script{
            //         dir("python"){
            //             withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            //     sh "docker build -t my-python:1.0 ."
            //     sh 'echo $USER'
            //     sh "echo $PASS | docker login -u $USER --password-stdin"
            //     sh "docker push $USER/my-python:1.0"
            //     }

            //         }
            //     }
            // }
            
            // }

    }
}
