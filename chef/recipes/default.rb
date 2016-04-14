Chef::Log.info("Verifying deployment was successful.")

require 'mixlib/shellout'
class MyError < StandardError; end

pgrep_command = ""
pgrep_command << "/usr/bin/pgrep node | wc -l"
      
      pgrep_command_out = Mixlib::ShellOut.new("#{pgrep_command}")
      pgrep_command_out.run_command
      pgrep_command_out.error!

    puts pgrep_command_out.stdout
pgrep_command_out.stdout.each_codepoint  {|c| print c, ' ' }

      pgrep_command_failed = 48
      pgrep_command_failed << 10      
      if pgrep_command_out.stdout.to_s == pgrep_command_failed
          fail MyError, "node is not running"
      end



Chef::Log.info("Deployment succeeded")
