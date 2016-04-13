Chef::Log.info("Verifying deployment was successful.")
class MyError < StandardError; end

x = false

ruby_block "check_node_is_running" do
    require 'mixlib/shellout'

    pgrep_command = Chef::Mixin::ShellOut.new("usr/bin/pgrep node | wc -l")

    pgrep_command.run_command
    puts pgrep_command.stdout
    if pgrep_command.stdout == "0"
          fail MyError, "node is not running"
    end
end


Chef::Log.info("Deployment succeeded")
