Chef::Log.info("Verifying deployment was successful.")


http_request 'get local healthCheck' do
  message ''
  url 'http://couchdb.apache.org/img/sketch.png'
  action :get
  end
  notifies :create, 'remote_file[/tmp/couch.png]', :immediately
end

Chef::Log.info("Deployment succeeded")
