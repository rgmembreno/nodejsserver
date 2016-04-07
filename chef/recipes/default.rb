Chef::Log.info("Verifying deployment was successful.")


bash "check_node_is_running" do
  user "root"
  code <<-EOH
    /usr/bin/pgrep node
  EOH
end

Chef::Log.info("Deployment succeeded")
