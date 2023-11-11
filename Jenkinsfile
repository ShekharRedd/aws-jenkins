pipeline {
    agent any
    environment {
        GIT_USERNAME = credentials('For-github').username
        GIT_PASSWORD = credentials('For-github').password
        REPO_URL = 'https://github.com/ShekharRedd/task_project_1.git'
        FEATURE_BRANCH = 'feature_branch'
    }
    stages {
        stage("checkout the feature branch and perform the unit test"){
            steps{
                script{
                    
                    sh "git checkout feature_branch" 
                    withCredentials([usernamePassword(credentialsId: 'For-github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {                    
                    // sh "git pull origin/feature_branch"
                    sh "git pull ${REPO_URL} ${FEATURE_BRANCH}"
                    // here we have to perform the unit test
                    

                    // sh "your_unit_test_command_here"
                    // Check if unit tests passed
                    // def unitTestResult = sh(script: "your_unit_test_command_here", returnStatus: true)
                    // if (unitTestResult == 0) {
                    //     echo "Unit tests passed. Proceeding to merge and pull request."
                    // } else {
                    //     error "Unit tests failed. Aborting."
                    // }
                }
            }
        }
        }

        stage("If it success then perfrom the merge to develop branch")
        {
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId: 'For-github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]){
                    sh "git checkout develop"

                    // sh "git pull origin develop"
                    sh "git pull https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/your-username/your-repo.git feature_branch"

                    // Merge the feature branch into develop
                    sh "git merge feature_branch"

                    // Push the changes to the remote repository
                    sh "git push origin develop"
                }
            }
        }
        }

        stage("Build react image") {
            // when {
            //     expression { env.CURRENT1 != 'true' } // Use env.CURRENT to access the environment variable
            // }
            steps {
                echo "========executing Build react Images========"
                // withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                // sh "cd react && docker build -t ${image1}:${tag1} ."
                // sh "echo $PASS | docker login -u $USER --password-stdin"
                // sh "docker tag my-react:1.0 $USER/${image1}:${tag1}"
                // sh "docker push $USER/${image1}:${tag1}"
                // }                
            }
        }
        stage("Build python image"){
            // when{
            //     expression {env.CURRENT2 !='true'}
            // }
            steps{
                echo "========executing Build python Images========"
                // withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                // sh "cd python && docker build -t ${image2}:${tag2} ."
                // sh 'echo $USER'
                // sh "echo $PASS | docker login -u $USER --password-stdin"
                // sh "docker tag ${image2}:${tag2} $USER/${image2}:${tag2}"
                // sh "docker push $USER/${image2}:${tag2}"
                // }                
                
            }
        }
}
}