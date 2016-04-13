Chef::Log.info("Verifying deployment was successful.")

class MyError < StandardError; end

x = false



Chef::Log.info("Test: #{x}")

if !x
    fail MyError, "node is not running"
end
Chef::Log.info("Deployment succeeded")
