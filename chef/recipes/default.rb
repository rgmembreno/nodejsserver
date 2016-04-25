Chef::Log.info("Verifying deployment was successful.")

verify_deployment 'check if node is running' do
  action :run
end

Chef::Log.info("Deployment succeeded")
