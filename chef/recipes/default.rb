Chef::Log.info("Verifying deployment was successful.")

class MyError < StandardError; end


bash "check_node_is_running" do
  user "root"
  fail MyError, "node is not running"
  not_if '/usr/bin/pgrep node'
end

Chef::Log.info("Deployment succeeded")
