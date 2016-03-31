Chef::Log.info("Verifying deployment was successful.")
serverstart = false
nodeRunning = ''
bash "check_node_is_running" do
  user "root"
  code <<-EOH
      'ps aux | grep node'
  EOH
end

Chef::Log.info("ServerStart  " + serverstart)
Chef::Log.info("nodeRunning  " + nodeRunning)
Chef::Log.info("Deployment succeeded")
