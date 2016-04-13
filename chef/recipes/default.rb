Chef::Log.info("Verifying deployment was successful.")

require 'mixlib/shellout'
class MyError < StandardError; end

x = false

ruby_block "check_node_is_running" do
      
      pgrep_command = Mixlib::ShellOut.new("/usr/bin/pgrep node | wc -l")
      pgrep_command.run_command
      pgrep_command.error!
      [pgrep_command.stderr, pgrep_command.stdout].join("\n")

    puts pgrep_command.stdout
      if pgrep_command.stdout == "0"
          fail MyError, "node is not running"
      end
end


Chef::Log.info("Deployment succeeded")
