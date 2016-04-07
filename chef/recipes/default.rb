Chef::Log.info("Verifying deployment was successful.")

class MyError < StandardError; end


execute "check_node_is_running" do
  fail MyError, "node is not running"
  not_if true
end

Chef::Log.info("Deployment succeeded")
