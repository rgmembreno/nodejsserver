Chef::Log.info("Verifying deployment was successful.")

class MyError < StandardError; end

pgrep_command = ""
pgrep_command << "/usr/bin/pgrep node | wc -l"
      

verify_deployment 'check if node is running' do
  action :run
end

Chef::Log.info("Deployment succeeded")
