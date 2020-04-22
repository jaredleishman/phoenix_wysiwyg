defmodule WysiwygWeb.EditorChannel do
  use Phoenix.Channel

  def join("editor:" <> _user_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("entry", %{"id" => _id} = _params, socket) do
    entry = %{
      "body" => %{
        "ops" => [
          %{"insert" => "This is "},
          %{"attributes" => %{"bold" => true}, "insert" => "bold"},
          %{"insert" => "\n"}
        ]
      }
    }

    push(socket, "entry", entry)
    {:noreply, socket}
  end

  def handle_in("entry", _params, socket) do
    new_entry = %{
      "body" => %{
        "ops" => []
      }
    }

    push(socket, "entry", new_entry)
    {:noreply, socket}
  end

  def handle_in("text_change", params, socket) do
    IO.inspect(params)
    {:noreply, socket}
  end
end
