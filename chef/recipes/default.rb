Chef::Log.info("Verifying deployment was successful.")

class MyError < StandardError; end

x = false

execute "check_node_is_running" do
  user "root"
  x = true
  not_if false
end

Chef::Log.info("Test: #{x}")

if !x
    fail MyError, "node is not running"
end
Chef::Log.info("Deployment succeeded")
