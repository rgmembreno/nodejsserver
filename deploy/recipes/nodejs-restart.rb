include_recipe 'deploy'

node[:deploy].each do |application, deploy|
  if deploy[:application_type] != 'nodejs'
    Chef::Log.debug("Skipping deploy::nodejs-restart for application #{application} as it is not a node.js app")
    next
  end

  ruby_block "restart node.js application #{application}" do
    block do
      Chef::Log.info("restart node.js via: #{node[:deploy][application][:nodejs][:restart_command]}")
      Chef::Log.info(`#{node[:deploy][application][:nodejs][:restart_command]}`)
      if($? != 0)
        Chef::Log.info('Failed to restart nodejs')
        1 == 0
      else
        Chef::Log.info('nodejs started successfully')
        1 == 1
      end
    end
  end

end
