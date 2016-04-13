Chef::Log.info("Verifying deployment was successful.")

require 'mixlib/shellout'
class MyError < StandardError; end

x = false

ruby_block "check_node_is_running" do


pgrep_command = Mixlib::ShellOut.new("usr/bin/pgrep node | wc -l")

      pgrep_command_out = shell_out(pgrep_command)
      pgrep_command_out.run_command
      if pgrep_command_out.stdout == "0"
          fail MyError, "node is not running"
      end
end


Chef::Log.info("Deployment succeeded")
