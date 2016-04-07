Chef::Log.info("Verifying deployment was successful.")


bash "check_node_is_running" do
  user "root"
   fail CustomError, "node is running"
   only_if '/usr/bin/pgrep node'
  end
end

Chef::Log.info("Deployment succeeded")
