Chef::Log.info("Verifying deployment was successful.")

require 'mixlib/shellout'
class MyError < StandardError; end

pgrep_command = ""
pgrep_command << "/usr/bin/pgrep node | wc -l"
      
      pgrep_command_out = Mixlib::ShellOut.new("#{pgrep_command}")
      pgrep_command_out.run_command
      pgrep_command_out.error!

    puts pgrep_command_out.stdout
Chef::Log.info("pgrep out char 0 #{pgrep_command_out.stdout[0]}")
Chef::Log.info("pgrep out char 1 #{pgrep_command_out.stdout[1]}")

falsyTest = (pgrep_command_out.stdout[0] == "0")
Chef::Log.info("Falsy test: #{falsyTest}")
falsyTest2 = (pgrep_command_out.stdout.to_s == "0")
Chef::Log.info("Falsy test 2: #{falsyTest2}")
     
      if pgrep_command_out.stdout[0] == "0"
          fail MyError, "node is not running"
      end



Chef::Log.info("Deployment succeeded")
