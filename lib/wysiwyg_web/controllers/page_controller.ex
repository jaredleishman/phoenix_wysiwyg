defmodule WysiwygWeb.PageController do
  use WysiwygWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
