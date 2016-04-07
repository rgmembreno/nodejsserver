Chef::Log.info("Verifying deployment was successful.")

class MyError < StandardError; end

x = false

ruby_block "check_node_is_running" do
  x = true
  not_if '/usr/bin/pgrep node | wc -l'
end

Chef::Log.info("Test: #{x}")

if !x
    fail MyError, "node is not running"
end
Chef::Log.info("Deployment succeeded")
