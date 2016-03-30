Chef::Log.info("Verifying deployment was successful.")
bash "check_node_is_running" do
  user "root"
  code <<-EOH
    only_if 'ps aux | grep', :serverstart => true
    Chef::Log.info("ServerStart  " + serverstart)
  EOH
end

Chef::Log.info("Deployment succeeded")
