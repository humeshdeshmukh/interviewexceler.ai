# Automated deployment script for interviewmaster.ai

# Variables
$ImageName = "interviewmaster:latest"
$DeploymentName = "interviewmaster-app"
$ContainerName = "interviewmaster"
$K8sDir = "k8s"

# Step 1: Build Docker image
Write-Host "Building Docker image..."
docker build -t $ImageName .

# Step 2: Apply all Kubernetes YAMLs in k8s directory
Write-Host "Applying all Kubernetes resources in $K8sDir..."
Get-ChildItem -Path $K8sDir -Filter *.yaml | ForEach-Object {
    kubectl apply -f $_.FullName
}

# Step 3: Set image explicitly for main app deployment (ensures rollout)
Write-Host "Updating deployment image..."
kubectl set image deployment/$DeploymentName $ContainerName=$ImageName

# Step 4: Wait for rollout to finish
Write-Host "Waiting for rollout to finish..."
kubectl rollout status deployment/$DeploymentName

# Step 5: Show pod and service status
Write-Host "Current pod status:"
kubectl get pods -o wide
Write-Host "Current service status:"
kubectl get services -o wide 