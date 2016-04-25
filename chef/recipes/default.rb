Chef::Log.info("Verifying deployment was successful.")

verify_deployment 'check if node is running' do
  action :start
end

Chef::Log.info("Deployment succeeded")
