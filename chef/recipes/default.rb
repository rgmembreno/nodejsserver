Chef::Log.info("Verifying deployment was successful.")

require 'mixlib/shellout'
class MyError < StandardError; end


ruby_block "check_node_is_running" do

      pgrep_command_out = `/usr/bin/pgrep node | wc -l`
      puts pgrep_command_out
      if pgrep_command_out == "0"
          fail MyError, "node is not running"
      end
end


Chef::Log.info("Deployment succeeded")
